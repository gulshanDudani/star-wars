import { useLocation } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";
import CryptoJS from "crypto-js";
import { useGetCharacterDetails } from "../../Hooks/useGetCharacterDetail/useGetCharacterDetail";
import "./CharacterDetails.css";
import { CHARACTER_DETAIL_PROPERTIES } from "../../Utils/constants";
import { Character } from "../../Types";

const CharacterDetails = () => {
    const location = useLocation();
    const [favourites, setFavourites] = useLocalStorage("favourites", []);
    const bytes = CryptoJS.AES.decrypt(favourites, 'favourites');
    const originalData:Character[] = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const id = location.pathname.split("/").pop();
    //An Alternate solution to calling the API to get character details is to persist the
    //list in redux or context.This wll help us avoid the API call.  
    const { data: characterData, isLoading, isError } = useGetCharacterDetails(id);
    
    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (isError) {
        return <div className="error">Error occurred. Please try again later.</div>;
    }

   

    const isFavourite = () => originalData.find((character) => character.id === id);

    const addFavourites = () => {
        const updatedFavourites = [...originalData, characterData];
        setFavourites(CryptoJS.AES.encrypt(JSON.stringify(updatedFavourites), 'favourites').toString());
    };

    const properties =  CHARACTER_DETAIL_PROPERTIES;

    return (
        <div className="character-wrapper">
            <div className="character-details">

                {characterData && properties.map((attribute: string) => (
                    <div key={attribute} className="character-attribute">
                        <span className="attribute-name">{attribute.replace('_', ' ').toUpperCase()} : </span>
                        <span className="attribute-value" id={attribute}>{characterData[attribute  as keyof Character] || "-"}</span>
                    </div>
                ))}
            </div>
            {!isFavourite() && (
                <button className="add-btn" onClick={addFavourites}>
                    Add to Favourites
                </button>
            )}
        </div>
    );
};

export default CharacterDetails;
