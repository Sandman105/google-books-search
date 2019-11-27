import React from 'react';

//We are going to do the same thing we did with Column.js, we are going to destructure the props so they are right in line so we know what they are before hand.

//So we are taking in a prop called bg, which is going to be the color of the card. We're taking in a prop called title, which we can see on our Search page. We're going to take a prop called image, which is the image of the book that we get back from Google Books. And a prop called children, which is all the information that is going to go in the card when we make it.

//1. We are going to do some logic inside of the Card. So we are going to make a function called checkColor. We are going to use the Bootstrap colors to determine our background, to determine what text we should show. Like if the text shoudl be dark or light. So we are going to make an array.
//2. And these are going to be background colors the darkText function, so if this is warning or light because warning is yellow, make the text dark. So we are going to make an if statement because we only want this to happen if we pass in a color background. So if bg (background) exists, we are going to do another if statement inside. So if the bg color is in the array, return a string that says text-dark. Else return text-light.
//And if there is no bg prop at all, we just want to return default.

//3. So make this card render, we need to call this function textColor and we are going to set the variable text color to the return value checkColor.

//4. So in return is where we are going to make all of our stuff.
//5. So we need a card, so we make a <div> and we define a className and say if bg exists and we are setting the color on the card and mb-2, margin on the card. And if bg isn't passed in. So this is our wrapper.
//6. Now to set the text color, we set a <div> with a class name of text color. So whatever the function returns, is going to be the className here {textColor}.
//7. Now we are going to make this card truely reuseable. So if the title exists, 

//8. And last thing we need is the card body, where all the information is going to go.

//Curly brackets are used when you need to do logic
//And parenthesis are used for return

const Card = ({ bg, title, image, children }) => {
    const checkColor = () => {
        const darkText = ['warning', 'light']

        if (bg) {
            if (darkText.includes(bg)) {
                return 'text-dark'
            } else {
                return 'text-light'
            }

        }

        return 'default'
    }
    const textColor = checkColor()
    return (
        <div className={bg ? `card bg-${bg} mb-2` : 'card mb-2'}>
            <div className={textColor}>
                {title && <h5 className={'card-header text-center'}>{title}</h5>}
                {image && (
                    <img src={image} alt={title} className={'card-img img-fluid'} />
                )}
                <div className="card-body">{children}</div>
            </div>
        </div>

    );
}

export default Card;