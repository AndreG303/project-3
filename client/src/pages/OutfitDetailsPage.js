import React, { useState } from "react";
import ShowOutfitDetails from "../components/ShowOutfitDetails/ShowOutfitDetails";
import SingleOutfit from "../components/SingleOutfit/SingleOutfit";
import { useAllOutfits } from "../utils/OutfitAPICalls";
import Jumbotron from "../components/TvShow1Jumbotron/TvShow1Jumbotron";

function Outfits(props) {
  const [showOutfits] = useAllOutfits();
  const [showOutfitBottom, setShowOutfitBottom] = useState(false);
  const handleChangeOfPage = (outfitid) => {
    if (outfitid) {
      console.log(outfitid);
      setShowOutfitBottom(outfitid);
    } else {
      setShowOutfitBottom(false);
    }
  };

  return (
    <>
      <Jumbotron />
      {showOutfits.length > 0 ? (
        <SingleOutfit
          showOutfits={showOutfits}
          handleChangeOfPage={handleChangeOfPage}
        />
      ) : null}
      {showOutfitBottom && (
        <ShowOutfitDetails showAddToCloset={true} outfitid={showOutfitBottom} />
      )}
    </>
  );
}

export default Outfits;