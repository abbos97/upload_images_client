import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { FaUpload } from "react-icons/fa";

function LocalPage() {
    const fileInputRef = useRef()
    const [images, setImages] = useState([])
    const [files, setFiles] = useState([])
    const [previewUrl, setPreviewUrl] = useState([])

    const handleIconClick = () => {
        fileInputRef.current.click()
    }

    const handleUpload = async () => {
        const formData = new FormData()

        for(let i = 0; i < files.length; i++) {
            formData.append('localImages', files[i])
        }
        console.log(formData)
        try {
            const res = await axios.post("http://localhost:3009/api/local/uploads", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if(res.status === 200) {
                setImages(pre => [...pre, ...res.data.data.images])
                setPreviewUrl([])
                setFiles([])
            }
        }catch(err) {
            console.log("Upload image error: ", err.message)
        }
    }

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles)
        
        if(selectedFiles.length > 0){
            const previews = selectedFiles.map(file => URL.createObjectURL(file))
            setPreviewUrl(pre => [...pre, ...previews])
        }
    }

    useEffect(() => {
        const getImages = async () => {
            try {
                const res = await axios.get("http://localhost:3009/api/local/images")

                setImages(res.data.data.images)
            }catch(err) {
                console.log(err.message)
            }
        }

        getImages()
    }, [])

    const api = `http://localhost:3009/uploads`
    return (
        <div className="container">
            <div className="local">
                <div className="title">You can upload images for local upload folder</div>
                <div className="preview-upload">
                <div className="preview">
                   {previewUrl.length > 0 && previewUrl.map((ele, i) => 
                        (<img src={ele} key={i} alt={`preview image-${i}`} width={'100%'} />)
                   )} 
                </div>
                <div>
                    <input type="file" hidden name="localImages" ref={fileInputRef} multiple onChange={handleFileChange} />
                    <button
                    onClick={handleIconClick}
                    className="upload-image-btn"
                >
                    <FaUpload /> Select Images
                </button>
                    <button className="send-image-btn" onClick={handleUpload}>Upload</button>
                </div>
                </div>
                    <p style={{marginTop: '100px'}}>Uploaded images</p>
                <div className="uploaded-box ">
                {Array.isArray(images) && images.length === 0 ? <img src={"/images/sw.svg"} alt="empty" style={{
                    width: '100%',
                    margin: "0 auto",
                    textAlign: 'center'
                }}/> : (
                    images?.map((ele, i) => (
                        <img src={`${api}/${ele}`} key={i} alt={i} />
                    ))
                )}
                </div>
            </div>
        </div>
    )
}

export default LocalPage