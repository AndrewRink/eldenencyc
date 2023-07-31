import React, { useState } from "react";


function Classes () {
    const {search, setSearch}=useState("");
    const [myClasses, setClasses]=useState();


    return (
        <div>
            <h1 class="title">Classes</h1>
            <p></p>
        </div>
    )
}

export default Classes