import React, {ChangeEvent, FC, useState} from 'react';

import {MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney} from "react-icons/md";
import Loader from "../Loader/Loader";
import {motion} from "framer-motion";
import {categoriesConfig} from "../../mocks/categoriesConfig";

import {actionType} from "../../context/reducer";
import {useStateValue} from "../../context/StateProvider";

import {getAllFoodItems, saveItem} from "../../utils/firebaseFunctions";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase.config";

import styles from "../CreateContainer/CreateContainer.module.css"

const CreateContainer:FC = () => {
    const [title, setTitle] = useState<string>("");
    const [calories, setCalories] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [category, setCategory] = useState<string>("Select Category");
    const [imageAsset, setImageAsset] = useState<string>("");
    const [fields, setFields] = useState<boolean>(false);
    const [alertStatus, setAlertStatus] = useState<string>("danger");
    const [msg, setMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [{ foodItems }, dispatch] = useStateValue();

    const clearData = () => {
        setTitle("");
        setImageAsset("");
        setCalories("");
        setPrice("");
        setCategory(category)
    };

    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true)
        if (e.target.files) {
            const imageFile = e.target.files[0]
            const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
            const uploadTask = uploadBytesResumable(storageRef, imageFile)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const uploadProgress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.log(error);
                    setFields(true);
                    setMsg("Error while uploading : Try Again 🙇");
                    setAlertStatus("danger");
                    setTimeout(() => {
                        setFields(false);
                        setIsLoading(false);
                    }, 4000);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageAsset(downloadURL);
                        setIsLoading(false);
                        setFields(true);
                        setMsg("Image uploaded successfully 😊");
                        setAlertStatus("success");
                        setTimeout(() => {
                            setFields(false);
                        }, 4000);
                    });
                }
            );
        }
    }

    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset("");
            setIsLoading(false);
            setFields(true);
            setMsg("Image deleted successfully 😊");
            setAlertStatus("success");
            setTimeout(() => {
                setFields(false);
            }, 4000);
        });
    }

    const save = () => {
        setIsLoading(true)
        try {
            if (!title || !calories || !imageAsset || !price || !category) {
                setIsLoading(false);
                setFields(true);
                setMsg("Required fields can't be empty");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                }, 4000);
            }
            else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    calories: calories,
                    qty: 1,
                    price: price,
                };
                saveItem(data);
                setIsLoading(false);
                setFields(true);
                setMsg("Data Uploaded successfully 😊");
                setAlertStatus("success");
                setTimeout(() => {
                    setFields(false);
                }, 4000);
                clearData();
            }
            fetchData()
        }
        catch (error: any) {
            console.log(error);
            setFields(true);
            setMsg("Error while uploading : Try Again 🙇");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 4000);
        }
    }

    const dispatchData = (data: any) => {
        dispatch ({
            type: actionType.SET_FOOD_ITEMS,
            foodItems: data,
        });
    }

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatchData(data)
        }).catch((error: any) => console.log(error));
    };

    return (
        <div className={styles.createWrapper}>
            <div className={styles.form}>
                {fields && (
                    <motion.p initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`${alertStatus === "danger" ? styles.danger : styles.wrong}`}>
                        {msg}
                    </motion.p>
                )}
                <div className={styles.fastFoodName}>
                    <MdFastfood className={styles.iconFastFood}/>
                    <input
                        type="text"
                        required
                        value={title}
                        placeholder="Give me a title..."
                        className={styles.input}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
                </div>
                <div className={styles.categories}>
                    <select defaultValue="Select Category"
                            className={styles.select}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}>
                        <option value="Select Category" className={styles.option} disabled>Select Category</option>
                        {categoriesConfig.map((category) => (
                            <option className={styles.option}
                                    value={category.name}
                                    key={category.id}>
                                {category.name}
                            </option>))}
                    </select>
                </div>
                <div className={styles.description}>
                    {isLoading ? <Loader/> : <>
                        {!imageAsset ? <>
                            <label className={styles.label}>
                                <div className={styles.assets}>
                                    <MdCloudUpload className={styles.iconUpload}/>
                                    <p className={styles.textUpload}>Click here to upload</p>
                                </div>
                                <input
                                    type="file"
                                    name="uploadedImage"
                                    accept="image/*"
                                    onChange={uploadImage}
                                    className={styles.inputFile}
                                />
                            </label>
                        </> :
                            <div className={styles.withAsset}>
                                <img className={styles.uploadedImage} src={imageAsset} alt="uploaded Image"/>
                                <button
                                    type="button"
                                    className={styles.buttonForDelete}
                                    onClick={deleteImage}>
                                    <MdDelete className={styles.iconDelete}/>
                                </button>
                            </div>}
                    </>}
                </div>
                <div className={styles.fastFoodName}>
                    <MdFoodBank className={styles.iconFastFood}/>
                    <input
                        type="text"
                        required
                        value={calories}
                        placeholder="Calories"
                        className={styles.input}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCalories(e.target.value)}/>
                </div>
                <div className={styles.fastFoodName}>
                    <MdAttachMoney className={styles.iconFastFood}/>
                    <input
                        type="text"
                        required
                        value={price}
                        placeholder="Price"
                        className={styles.input}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}/>
                </div>
                <div className={styles.forButton}>
                    <button className={styles.submit} onClick={save}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default CreateContainer;