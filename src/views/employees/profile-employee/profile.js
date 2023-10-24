import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { id } = useParams();
    return (
        <>
            <h2>Hello world</h2>
        </>
    )
}

export default Profile; 