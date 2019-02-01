
function untrack(myurl){
    console.log(myurl);
    // chrome.identity.getProfileUserInfo(function(info) {
    //   var  email = info.email;
    // email = 'tongxiong99@gmail.com';
    // console.log('email: ',email);
    // var xhr2 = new XMLHttpRequest();
    // xhr2.open("POST", "http://34.204.12.200:5000/delete_page", true);
    // xhr2.onreadystatechange = function(e){
    //   if(xhr2.readyState===4 && xhr2.status===200){
    //     window.location.reload();
    //   }
    // }
    // var params = {'email': email, 'url': this.state.value.url};
    // xhr2.send(JSON.stringify(params));
      // });


  }

  onClick={event=>untrack(props.arr)} 


  <CardMedia
                            className={classes.cardMedia}
                            image={card.img}
                            title="pictures"
                          />



                          <div style={{
                                paddingTop: 10,
                                paddingBottom:0,
                              }}>
                              <Typography variant="body1">
                                ${card.price}
                              </Typography>
                              </div>



                              <LinkIcon className={classes.linkIcon}  />



                            <div style={{
                                display: 'inline-flex',
                                VerticalAlign: 'text-bottom',
                                BoxSizing: 'inherit',
                                textAlign: 'center',
                                AlignItems: 'center'

                              }}>
                                <LinkIcon className={classes.linkIcon}  />
                                revolve
                              </div>                         
                        

lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    fontSize: 11,
    marginTop: '-0.9em',
  },


 <ButtonBase className={classes.cardButton} href={card.url} target="_blank"> 






