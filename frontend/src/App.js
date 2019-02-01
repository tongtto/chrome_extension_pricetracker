/* global chrome */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Favorite from '@material-ui/icons/Favorite';
import Delete from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  lightTooltip: {
    color: '#212121',
    background: theme.palette.background.default,
    fontSize: 14,
    marginBottom: 0,
    marginTop: 0,
    position: 'center',
    /*fontFamily: ['"brown"','"helvetica neue"','"Helvetica"','Arial','sans-serif']*/

    
  },
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 6,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  card: {

    maxWidth: 500,
    // position: 'relative',
    
    
  },
  
  cardGrid: {
    backgroundColor: 'transparent',
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  cardMedia: {
    // paddingTop: '20%', // 16:9
    
    paddingTop: '125%',
    
    
  },
  // img: {
  //   // display: 'block',
  //   width:30,
  //   height:40,
  // },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

const mytheme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Brown"',
      '"Helvetica"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightMedium: 500,
    subheading: {
      fontSize:14,
      fontWeight: 550,
      // lineHeight: 1,
      // fontColor:'#212121'
    },
    title: {
      fontSize: 14,
      fontWeight: 350,
      // lineHeight: 1,
    },
    body1: {
      // fontStyle: 'italic',
      fontSize: 20,
      fontWeight: 580,
      // lineHeight: 2,

    },
  },
});

function concatenate(str) {
  return "at "+str;

};

function unfav(url) {
  console.log('unfavorite');
  chrome.identity.getProfileUserInfo(function(info) {
      var  email = info.email;
      console.log('email: ',email);
      var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://34.204.12.200:5000/delete_page", true);
        xhr.onreadystatechange = function(e){
          if(xhr.readyState===4 && xhr.status===200){
            // this.forceUpdate();
          }
        }
        var params = {'email': email, 'url': url};
          xhr.send(JSON.stringify(params));
        });
}

function Album(props) {
    

    const { classes } = props;
    // const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    console.log('props.array:',props.myarr);
    console.log(props.myarr[1].img);
    console.log(props.classes);
        return (
          <React.Fragment>
            <CssBaseline />
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <CameraIcon className={classes.icon} />
                <Favorite className={classes.icon} />
                <Typography variant="title" color="inherit" noWrap>
                  dssssssss
                </Typography>
              </Toolbar>
            </AppBar>
            <main>
              {/* Hero unit */}
              <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                  <Typography variant="display2" align="center" color="textPrimary" gutterBottom>
                    Favorites
                  </Typography>
                  
                  
                </div>
              </div>
              <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}
                <Grid container spacing={40}>
                  {props.myarr.map((card) => (
                    <Grid item key={card.url} sm={8} md={6} lg={3}  style={{
                      padding: 30,
                      position:'relative',
                      justifyContent: 'center',
                    }}>

                    
                    
                      
                      
                      <ButtonBase className={classes.cardButton} >  
                        <Tooltip title={concatenate(card.src)} classes={{ tooltip: classes.lightTooltip }} placement="top">
                          <div class="mycard">
                            <CardMedia>
                              <img src={card.img} 
                              style={{
                                width:150,
                                height:'auto',
                              }}/> 
                            </CardMedia>
                            <MuiThemeProvider theme={mytheme}>
                            <div style={{
                            }}>
                              <CardContent style={{
                                width:200,
                                height:'auto',
                                textAlign: 'left',
                                paddingBottom: 0,
                                paddingTop: 0
                              }}>
                                <Typography variant="subheading">
                                  {card.brand}
                                </Typography>
                                <Typography variant="title">
                                  {card.title}                              
                                </Typography>
                              {/*</CardContent>  */}
                              {/*<CardActions disableActionSpacing style={{*/}
                               {/*   paddingTop:0,*/}
                              {/*}}}>*/}
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}>
                                <Typography variant="body1">
                                  ${card.price}
                                </Typography>
                                <Button  color="secondary" size="small" className={classes.button} onClick={()=>{unfav(card.url)}}>
                                  Delete
                                </Button>
                               </div>
                              {/*</CardActions>*/}
                              </CardContent>
                              </div>
                              </MuiThemeProvider>
                              </div>
                              </Tooltip>
                      </ButtonBase>
                        

                    </Grid>
                  ))}
                </Grid>
              </div>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
              <Typography variant="title" align="center" gutterBottom>
                Footer
              </Typography>
              <Typography variant="subheading" align="center" color="textSecondary" component="p">
                Something here to give the footer a purpose!
              </Typography>
            </footer>
            {/* End footer */}
          </React.Fragment>
        );
  
}






		



Album.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Album);
