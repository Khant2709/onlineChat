import React from 'react';
import classes from './Preloader.module.css'

const Preloader = () => {
    return (
            <div className={classes.loadingData}>
                <h2>
                    <span className={classes.char}>З</span>
                    <span className={classes.char}>а</span>
                    <span className={classes.char}>г</span>
                    <span className={classes.char}>р</span>
                    <span className={classes.char}>у</span>
                    <span className={classes.char}>з</span>
                    <span className={classes.char}>к</span>
                    <span className={classes.char}>а</span>
                    <span className={classes.char}>.</span>
                    <span className={classes.char}>.</span>
                    <span className={classes.char}>.</span>
                </h2>
            </div>
    );
};

export default Preloader;