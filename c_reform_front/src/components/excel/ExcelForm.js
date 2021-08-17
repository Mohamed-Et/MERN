import React,{useState} from 'react';
import axios from "axios";
const ExcelForm = () => {
    const [file , setFile] = useState([]);
    const formData = new FormData();

    const getFile = e =>{
        const fileVar = e.target.files;
        setFile(fileVar[0]);
        console.log(fileVar);
    }

    const postFile = e => {
        e.preventDefault();
        formData.append("excel_file", file);
        axios({
            url: `http://localhost:3002/monitoring/postFile`,
            method: "POST",
            data: formData, 
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(
            (response) => {
                console.log(response);
                if (response.status === 201) {
                    console.log("File transfered !");
                }
            }, (error) => {
                console.log(error);
            }
        )   
    }
    return(
        <div>
            <form action="" encType="multipart/form-data">
                <input name="excel_file" onChange={getFile} type="file"/>
                <input onClick={postFile} type="submit"/>
            </form>
        </div>
    );
}

export default ExcelForm;

/*axios
            .post(`http://localhost:3002/monitoring/postFile`, file);
        */