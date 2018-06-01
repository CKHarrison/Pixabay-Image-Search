import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: '',
    currentImgURL: ''
  };

  handleOpen = (img, imgURL) => {
    this.setState({ open: true, currentImg: img, currentImgURL: imgURL });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map((img) => (
            <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  by: <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                // creating the open button
                <IconButton onClick={() => this.handleOpen(img.largeImageURL, img.pageURL)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt={img.tags} />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    // creating the values for the close flat dialog button
    const actions = [<FlatButton label="Close" primary={true} onClick={this.handleClose} />];

    return (
      <div>
        {imageListContent}
        <Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.state.handleClose}>
          <a href={this.state.currentImgURL} target="_blank" style={{ marginBottom: '10px' }}>
            <img src={this.state.currentImg} alt={''} style={{ width: '100%', height: '100%' }} />
          </a>
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
