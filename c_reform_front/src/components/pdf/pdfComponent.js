import React, { useState } from 'react';
import axios from "axios";
const pdfComponent = () => {

    const generateFile = e => {
        var fileDownload = require('js-file-download');
        e.preventDefault();
        axios({
            url: `http://localhost:3002/monitoring/generateHtml`,
            method: "GET",
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        }).then(
            (response) => {
                console.log(response);
                if (response.status === 201) {
                    console.log("File generated !");
                        fileDownload(response.data, 'monitoring.pdf');
                    }
            }, (onLoadError) => {
                console.log(onLoadError);
            }
        )
    }
    return (
        <div>
            <form action="" encType="multipart/form-data">
                <input onClick={generateFile} type="submit" value="Download PDF!"/>
            </form>
        </div>
    );
}

export default pdfComponent;

/*axios
            .post(`http://localhost:3002/monitoring/postFile`, file);
        */