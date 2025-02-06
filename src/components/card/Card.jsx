import "./card.css"

export function Card()
{
    return (
        <>
            <div class="container">
                <div class="card-wrapper">
                    <ul class="card-list">
                        <li class="card-item">
                            <a href="#" class="card-link">
                                <img src="../../Media/Icon.png" alt="music photo" class="card-image"></img>
                                <p class="badge"> Music </p>
                                <h2 class="card-title"> TITULO CANCION </h2>
                                <button class="material-symbols-rounded"> arrow_foward </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Card