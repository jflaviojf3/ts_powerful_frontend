import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Title(props) {
  const align = props.align ? props.align : 'left';
  const variant = props.variant ? props.variant : "h6";
  return (
    <Typography component="h2" variant={variant} color="primary" align={align} gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;