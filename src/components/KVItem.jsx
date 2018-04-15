import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
    'KVItem-container': {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '0.1em',
    },

    'KVItem-key': {
        fontWeight: 'bold',
        marginRight: '0.5em',
    },
};

const KVItem = withStyles(styles)(({ classes, renderKey, renderValue }) => (
    <div className={classes['KVItem-container']}>
        <Typography variant="subheading" color="textSecondary" className={classes['KVItem-key']}>
            {renderKey()}
        </Typography>
        <Typography variant="subheading" color="textSecondary">
            {renderValue()}
        </Typography>
    </div>
));

export default KVItem;
