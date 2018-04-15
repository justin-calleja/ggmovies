import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MUIDialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';

import Autocomplete from './Autocomplete';
import MovieSearchStore from '../stores/MovieSearchStore';
import DetailPageStore from '../stores/DetailPageStore';

const styles = theme => ({
    dialogTitle: {
        textAlign: 'center',
    },
});

class MovieSearchDialog extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        movieSearchStore: PropTypes.instanceOf(MovieSearchStore).isRequired,
        detailPageStore: PropTypes.instanceOf(DetailPageStore).isRequired,
        width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
    };

    isWidthGreaterThanSM = () => {
        const { width } = this.props;
        return width !== 'sm' && width !== 'xs';
    };

    render() {
        const { movieSearchStore, detailPageStore, classes } = this.props;
        const widthGreaterThanSM = this.isWidthGreaterThanSM();
        const responsiveProps = widthGreaterThanSM ? { maxWidth: 'md', fullWidth: true } : { fullScreen: true };
        return (
            <MUIDialog
                {...responsiveProps}
                open={movieSearchStore.dialog.visible}
                onClose={movieSearchStore.dialog.hide}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle className={widthGreaterThanSM ? classes.dialogTitle : undefined}>
                    Search movies
                </DialogTitle>
                <DialogContent>
                    <Autocomplete movieSearchStore={movieSearchStore} detailPageStore={detailPageStore} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={movieSearchStore.dialog.hide} color="primary">
                        Dismiss
                    </Button>
                </DialogActions>
            </MUIDialog>
        );
    }
}

export default withStyles(styles)(withWidth()(observer(MovieSearchDialog)));
