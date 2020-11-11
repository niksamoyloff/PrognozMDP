import React, { useState } from 'react';
import SelectSection from './SelectSection';

function Home() {
    const [sectionId, setSectionId] = useState("");

    function handleChangeSectionId(newSectionId) {
        setSectionId(newSectionId);
    }

    return (
      <SelectSection onChangeSectionId={handleChangeSectionId} />
    );
}

export default Home;