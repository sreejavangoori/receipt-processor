let receiptMap = new Map();
const { v4: uuids4 } = require("uuid");

const addReceipt = async (request, response) => {
  const payload = request.body;
  if (request.body) {
    const { retailer, purchaseDate, purchaseTime, total, items } = payload;

    let points = 0;
    try {
      points = calculatePoints(payload);
    } catch (error) {
      response.status(400).send("Error calculating points");
    }

    const newId = uuids4();
    let receipt = {
      retailer,
      purchaseDate,
      purchaseTime,
      total,
      items,
      points,
    };
    receiptMap.set(newId, receipt);

    response.status(201).json({ Id: newId });
  } else {
    response.status(400).send("Error");
  }
};

const getPoints = async (request, response) => {
  const receiptId = request.params.receiptId;
  const receipt = receiptMap.get(receiptId);
  if (receipt) {
    const points = receipt.points;
    response.status(200).json({
      points: points,
    });
  } else {
    response.status(404).send("No receipt found");
  }
};

function calculatePoints(receipt) {
  let points = 0;
  points += retailerRules(receipt.retailer);
  points += totalsRules(receipt.total);
  points += itemsRules(receipt.items);
  points += dateTimeRules(receipt.purchaseDate, receipt.purchaseTime);

  return points;
}

function retailerRules(retailer) {
  let points = 0;
  for (let i = 0; i < retailer.length; i++) {
    if (retailer[i].match(/[a-z0-9]/i)) {
      points++;
    }
  }
  return points;
}

function totalsRules(total) {
  let points = 0;
  if (total % 1 === 0) {
    //check if round dollar
    points += 50;
  }

  if (total % 0.25 === 0) {
    //check if multiple of .25
    points += 25;
  }
  return points;
}

function itemsRules(items) {
  let points = 0;
  points += Math.floor(items.length / 2) * 5; //add 5 points for every two items
  items.forEach((item) => {
    if (item.shortDescription.trim().length % 3 === 0) {
      //check if short desc is multiple of 3
      points += Math.ceil(item.price * 0.2);
    }
  });
  return points;
}

function dateTimeRules(purchaseDate, purchaseTime) {
  const date = new Date(purchaseDate);
  const hour = parseInt(purchaseTime.split(":")[0]);
  let points = 0;
  if (date.getUTCDate() % 2 === 1) {
    //check if day is odd
    points += 6;
  }

  if (hour >= 14 && hour < 16) {
    //check if time is between 14:00 and 16:00
    points += 10;
  }
  return points;
}

module.exports = { addReceipt, getPoints };
