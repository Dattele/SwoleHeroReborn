import React from "react";

export default function Monster({ monster }) {
  return (
    <div className="Monster-Card">
      <h2>{monster.name}</h2>
      <img src={monster.image} alt="Monster"/>
      <p><i>{monster.description}</i></p>
      <p><strong>HP:</strong> {monster.hp}</p>
      <p><strong>Attack:</strong> {monster.attack}</p>
      <p><strong>Defense:</strong> {monster.defense}</p>
      <p><strong>Speed:</strong> {monster.speed}</p>
      <h3>Attacks:</h3>
      <ul>
        {monster.attacks.map((attack, index) => (
          <li key={index}>
            <strong>{attack.name}:</strong> {attack.damage} DMG {attack.effect && `(${attack.effect})`}
          </li>
        ))}
      </ul>
      <h3>Loot:</h3>
      <ul>
        {monster.loot.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}