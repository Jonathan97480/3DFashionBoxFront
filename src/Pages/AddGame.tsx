

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
    roms: File | undefined;
    romsOriginalName: string;
    video: File | undefined;
    videoOriginalName: string;
    name: string;
    machine: string;
    type: string;
}

export default function AddGame() {
    const [formData, setFormData] = useState<FormData>({
        roms: undefined,
        romsOriginalName: '',
        video: undefined,
        videoOriginalName: '',
        name: '',
        machine: '',
        type: '2d', // Défaut à 2D
    });

    const handleChange = (field: string, value: string | File) => {

        setFormData({
            ...formData,
            [field]: value,
        });
        console.log(formData);
    };

    const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            console.error('No file selected');
            return;
        }
        const file = e.target.files[0];
        const name_key = `${field}OriginalName` as keyof FormData;
        if (field === 'roms') {
            setFormData({
                ...formData,
                roms: file,
                romsOriginalName: file ? file.name : '',
                name: file ? file.name.split('.')[0] : '',
            });

        } else if (field === 'video') {
            setFormData({
                ...formData,
                video: file,
                videoOriginalName: file ? file.name : '',
            });
        }



    };


    const pushGameInDatabase = () => {
        const { roms, video, name, machine, type, romsOriginalName, videoOriginalName } = formData;
        console.log(roms);
        if (roms && video && name && machine && type) {
            const newFormData = new FormData();
            newFormData.append('roms', roms);
            newFormData.append('video', video);
            newFormData.append('name', name);
            newFormData.append('machine', machine);
            newFormData.append('type', type);
            newFormData.append('romsOriginalName', romsOriginalName);
            newFormData.append('videoOriginalName', videoOriginalName);


            fetch('http://localhost:8080/api/addGame', {
                method: 'POST',
                body: newFormData,
            })
                .then((response) => {
                    console.log(response);
                    // Vous pouvez effectuer des actions supplémentaires ici
                    handleCleearAllInput();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert('Veuillez remplir tous les champs');
        }
    };

    const handleCleearAllInput = () => {
        setFormData({
            ...formData,
            roms: undefined,
            romsOriginalName: '',
            video: undefined,
            videoOriginalName: '',
            name: '',
            machine: '',
            type: '2d', // Défaut à 2D
        });



    };

    return (
        <div className="addGame">
            <h1>AddGame</h1>
            <label htmlFor="roms">Roms</label>
            <input type="file" value={
                formData.roms?.type === 'application/zip' ? formData.romsOriginalName : ''
            } name="roms" id="roms" onChange={(e) => handleFileChange('roms', e)} />
            <label htmlFor="video">Video</label>
            <input type="file" /* value={
                formData.video?.type === 'video/mp4' ? formData.videoOriginalName : ''

            } */ name="video" id="video" onChange={(e) => handleFileChange('video', e)} />
            <label htmlFor="name">Name</label>
            <input type="text" value={formData.name} name="name" id="name" onChange={(e) => handleChange('name', e.target.value)} />
            <label htmlFor="type">Type</label>
            <select name="type" value={formData.type} id="type" onChange={(e) => handleChange('type', e.target.value)} defaultValue={formData.type}>
                <option value="2d">2D</option>
                <option value="3d">3D</option>
            </select>
            <div className="btn_validate">
                <button onClick={pushGameInDatabase}>Valider</button>
            </div>
        </div>
    );
}