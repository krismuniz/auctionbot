module.exports = (data) => {
  let products = []
  data.forEach((v, i) => {
    let current_bid = 0
    let top_bidder = ''
    if (!v.current_bid) {
      current_bid = v.min_bid
      top_bidder = `(min bid)`
    } else {
      current_bid = v.current_bid.price
      top_bidder = `(${v.current_bid.user.first_name})`
    }

    let product = {
      title: v.title,
      image_url: v.image_url,
      subtitle: `Current Bid: $${(current_bid / 100).toFixed(2)} ${top_bidder}`,
      buttons: [
        {
          type: 'postback',
          payload: `RAISE_${v.id}_${Number(current_bid) + Number(v.min_increment_bid)}`,
          title: `Raise bid $${(v.min_increment_bid / 100).toFixed(2)}`
        },
        {
          type: 'postback',
          payload: `RAISE_${v.id}_${Number(current_bid) + Number(v.min_increment_bid * 2)}`,
          title: `Raise bid $${(Number((v.min_increment_bid / 100).toFixed(2)) * 2).toFixed(2)}`
        }
      ]
    }

    products.push(product)
  })

  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: products
      }
    }
  }
}
