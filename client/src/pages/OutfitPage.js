import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";
<<<<<<< HEAD
import { Row, Col, Container, Button } from "react-bootstrap";
=======
import { Row, Col, Container } from "../components/Grid";
import { Button } from "react-bootstrap"
import UserContext from "../utils/UserContext";
>>>>>>> 829c8e94ab471629d3d4d72fc23dbdf46a252356

function OutfitPage(props) {

 
  const [outfit, setOutfit] = useState({
    outfitImage: "",
    items: [],
  });

  let styles = {
    outfitCard: {
      backgroundColor: "#d8dbe2",
      color: "white",
      paddingTop: "40px",
      width: "70vw",
      minHeight: "850px",
      marginTop: "0px"
    },
    outfitImg: {
      padding: "20px",
    //   float: "right",
      marginBottom: "20px"
    },
    outfitText: {
      fontFamily: "'Rubik', sans-serif",
      fontSize: "25px",
    //   float: "right",
    }
  };

  const { outfitid } = useParams();

  useEffect(() => {
    if (props.outfitid) {
      API.getOutfit(props.outfitid)
        .then((res) => {
          setOutfit(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      API.getOutfit(outfitid)
        .then((res) => {
          setOutfit(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [props]);

  const handleAddToCloset = async () => {
    console.log(outfitid);
    await API.updateUserOutfits(outfitid).then((data) => {
      console.log(data);
      
    });
  };

  const handleDelete = (event, outfitid) => {
    API.deleteUserOutfit(outfitid).then((data) => {
      console.log(data);
      if(props.setShowUserOutfits){
        data.data.outfits.map((outfitid) => {
          let showUserOutfits = [];
          API.getOutfit(outfitid).then((outfitdata) => {
            showUserOutfits = [...showUserOutfits, outfitdata.data];
            props.setShowUserOutfits(showUserOutfits);
          });
        });
      }
    });
    
  };

  return (
    <div>
      <Container className="container-outfit">
          <Row>
          <Col size="md-4">
        <img style={styles.emily} src={outfit.outfitImage} alt="outfit-image" />
        </Col>
        <Col size="md-8">
        {outfit.items.map((items) => (
          <Row>
            <Col size="md-3">
              <img
                style={styles.outfitImg}
                className="itemImg"
                src={process.env.PUBLIC_URL + items.image}
              ></img>
            </Col>
            <Col size="md-8">
              <p style={styles.outfitText} className="itemName">
                {items.name}
              </p>
              <p style={styles.outfitText} className="itemLink">
                <a href={items.url}>Click here to buy this product</a>
              </p>
            </Col>
          </Row>
        ))}
        </Col>
        </Row>
        {(() => {
          if (props.showAddToCloset) {
            return <Button onClick={handleAddToCloset}>ADD TO CLOSET</Button>;
          } else {
            return <Button onClick={event => handleDelete(event, outfit._id)}>DELETE OUTFIT</Button>;
          }
        })()}
      </Container>
    </div>
  );
}

export default OutfitPage;
