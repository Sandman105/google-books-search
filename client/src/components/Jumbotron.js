import React from 'react';
import Container from './Container';
import Row from './Row';
import Column from './Column';
//We are using NavLink which is a component from react-router-dom, which is going to let us go to other pages. Becasue we can't use an a tag
import { NavLink } from 'react-router-dom';


//We are going to use our other components in here

//And we are starting with the stateless component called Jumbotron and we are going to take in props
const Jumbotron = props => {
    //1. So first we are going to make a <div> and we are going to define className and is going to be a bunch of stuff based on props.
    //2. jumbotron is going to be the default and say if props.fluid exists we are going to say jumbotron-fluid else and an empty string.
    //3. Then we are going to set a color, so if props.bg exists put whatever the color there or default
    //4. Then we are going to change the color of the text, so props.color or default to dark
    //5. Then we are going to say text.center because we want it to be centered no matter what.
    //And this is our Jumbotron <div> with all of our classNames based on props

    //Now inside the <div>, we are going to put a container and we don't need it to be fluid, so we are just going to put Container. And inside this is where the Row and the Columns come in to play

    //1. So we start with Row and we want our Row to be a center row. So we going to use helper and use justify-content-center, this is from Bootstrap.
    //2. Inside Row, we are going to put an <h1> tag and it's going to be the page title.
    //3. Almost forgot, we need to be a Column around the <h1> tag and it's going to be Column {base = 12}
    //4. We are going to make another row and we are going to copy the same Row information from the other row. And inside we are going to define the size of the Column. So we choose 6, since we want a medium sized column, 6.
    //5. And inside of Column we are going to put NavLink, so when they click on this, where do they want to go. So we are going to give the user a way to get to the search page and give it a className of button, a large button. And we will say Search inside of NavLink.
    //6. And then we are going to make another Column and another NavLink and repeat the same thing for a Saved Button.
    return (
        <div
            className={`
        jumbotron
        ${props.fluid ? 'jumbotron-fluid' : ''}
        bg-${props.bg || 'default'} 
        text-${props.color || 'dark'}
        text.center
        `}>
            <Container>
                <Row helper={'justify-content-around'}>
                    <Column>
                        <h1>{props.pageTitle}</h1>
                    </Column>

                </Row>
                <Row helper={'justify-content-around'}>
                    <Column md={6} sm={6} base={4}>
                        <NavLink to='/search' className='btn btn-info btn-lg'>
                            Search
                        </NavLink>
                    </Column>
                    <Column md={6} sm={6} base={4}>
                        <NavLink to='/saved' className='btn btn-info btn-lg'>
                            Saved
                        </NavLink>

                    </Column>
                </Row>
            </Container>

        </div>

    );
}

export default Jumbotron;