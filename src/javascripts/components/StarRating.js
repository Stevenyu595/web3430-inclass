import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'

const createArray = length => [...Array(length)];

export default function StarRating({ rating, totalStars = 5}) {
    return (
        <>
        {createArray(totalStars).map((n, i) => (
            <FaStar 
                key={i} color={i <= Math.floor(rating / 2) - 1 ? "maroon" : "grey"}
            />
        ))}
        </>
    );
}