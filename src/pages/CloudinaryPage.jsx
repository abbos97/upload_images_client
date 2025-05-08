


import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { FaUpload } from "react-icons/fa";

function CloudinaryPage() {
    const fileInputRef = useRef()
    const [images, setImages] = useState([])
    const [files, setFiles] = useState([])
    const [previewUrl, setPreviewUrl] = useState([])
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];

    const handleOpenWindow = () => {
        fileInputRef.current.click()
    }

    const handleGetImages = async (e) => {

        const files = Array.from(e.target.files)
        if(!files[0]) return

        for (let i = 0; i < files.length; i++) {
            if(!allowedTypes.includes(files[i].type)) {
                alert("Ruxsat etilmagan fayl turi!")
                return;
            }
        }

        const imagesUrl = files.map(file => URL.createObjectURL(file))

        setPreviewUrl(pre => [...pre, ...imagesUrl])
        
    }   

    const handleCancel = () => {
        previewUrl.forEach(url => URL.revokeObjectURL(url))
        setPreviewUrl([])
    }

    const api = `http://localhost:3009/uploads`
    return (
        <div className="container">
            <div className="local">
                <div className="title">You can upload images to the Cloudinary upload folder.</div>
                <div className="preview-upload">
                <div className="preview">
                   {previewUrl?.length > 0 && previewUrl.map((ele, i) => 
                        (<img src={ele} key={i} alt={`preview image-${i}`} width={'100%'} />)
                   )} 
                </div>
                <div>
                    <input type="file" hidden name="images" ref={fileInputRef} multiple onChange={handleGetImages} />
                    <button
                    className="upload-image-btn"
                    onClick={handleOpenWindow}
                >
                    <FaUpload /> Select Images
                </button>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <button className="send-image-btn" >Upload</button>
                    {previewUrl?.length > 0 && <button className="delete-image-btn" onClick={handleCancel}>Cancel</button> }
                </div>
                </div>
                </div>
                    <p style={{marginTop: '100px'}}>Uploaded images</p>
                <div className="uploaded-box ">
                {Array.isArray(images) && images?.length === 0 ? <img src={"/images/sw.svg"} alt="empty" style={{
                    width: '100%',
                    margin: "0 auto",
                    textAlign: 'center'
                }}/> : (
                    Array.isArray(images) && images?.map((ele, i) => (
                        <div className="trash-box" style={{
                            position: "relative"
                        }}>
                            <img src={`${api}/${ele}`} key={i} alt={i} />
                            <div style={{
                                position: "absolute",
                                width: '50px',
                                height: "50px",
                                borderRadius: "25px",
                                background: "#fff",
                                bottom: "10px",
                                right: "10px",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }} className="trash">
                                 <img src="images/trash.png" alt="trash" style={{ width: "30px", height: "auto", marginBottom: "0"}}/>
                            </div> 
                        </div>
                    ))
                )}
                </div>
            </div>
        </div>
    )
}

export default CloudinaryPage