import React, { useState } from "react";
import CryptoJS from "crypto-js";
import useLocalStorage from "../../Hooks/useLocalStorage";
import "./Favourites.css"
import { FAVOURITES_PROPERTIES } from "../../Utils/constants";
import { Character } from "../../Types";

const Favourites = () => {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  let originalData: Character[] = [];
  try {
    const bytes = CryptoJS.AES.decrypt(favourites, "favourites");
    originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) || [];
  } catch (e) {
    console.error("Error decrypting favourites data", e);
  }

  const removeFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    const filteredFavourites = originalData.filter(data => data.id !== id);

    const cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(filteredFavourites),
      "favourites"
    ).toString();
    setFavourites(cipherText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, attribute: string) => {
    if (editingCharacter) {
      const updatedCharacter = { ...editingCharacter, [attribute]: e.target.value };
      setEditingCharacter(updatedCharacter);
    }
  };

  const saveChanges = () => {
    if (editingCharacter) {
      const updatedData = originalData.map((character) =>
        character.id === editingCharacter.id ? editingCharacter : character
      );
      const cipherText = CryptoJS.AES.encrypt(
        JSON.stringify(updatedData),
        "favourites"
      ).toString();
      setFavourites(cipherText);
      setEditingCharacter(null);
    }
  };

  if (!originalData.length) {
    return <div className="empty-favourites">No favourites added yet!</div>;
  }

  return (
    <div className="favourites-container">
      {originalData.map((favourite:any) => (
        <div key={favourite.id} className="favourite-item">
          <div className="favourite-details">
            {FAVOURITES_PROPERTIES.map((attribute:string) => (
              <div key={attribute} className="favourite-attribute">
                <span className="attribute-name">
                  {attribute.replace("_", " ").toUpperCase()}:
                </span>
                {attribute === "gender" || attribute === "eye_color" ? (
                  <input
                    type={"text"}
                    value={editingCharacter ? editingCharacter[attribute] : favourite[attribute]}
                    onChange={(e) => handleChange(e, attribute)}
                    className="edit-input"
                    disabled={!editingCharacter || favourite.id !== editingCharacter.id}
                  />
                ) : (
                  <span className="attribute-value">{favourite[attribute]}</span>
                )}
              </div>
            ))}
          </div>
          {editingCharacter && favourite.id === editingCharacter.id ? (
              <button className="save-btn" onClick={saveChanges}>
                Save Changes
              </button>
            ) : (
              <button
                className="edit-btn"
                onClick={() => setEditingCharacter(favourite)}
              >
                Edit
              </button>
            )}
          <button
            className="remove-btn"
            id={favourite.id}
            onClick={removeFavourites}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favourites;
