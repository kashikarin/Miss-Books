export function ReviewPreview({review, onRemoveReview}) {
    const star = '\u2605'
    const {fullname, rating, readDate} = review
    const removeSign = '\u1f5d1'
    let ratingArr = new Array(+rating)
    ratingArr = ratingArr.fill(0).map((rating, i) => i+1).reverse()
    
    function handleRemove(){
        onRemoveReview(review.id)
    }

    return(
        <section className='review-preview-container'>
            <button onClick={handleRemove} className='remove-review-btn'>X</button>
            <h5>{fullname}</h5>
            <article className="stars-container">
                {ratingArr.map((ratingStar, i) => (<span className='star-review-preview' key={i}>
                    {star}
                </span> ))}
            </article>
            
            <span className='read-date-review-preview'>Read on: <br /><span>{readDate}</span></span>           
        </section>    
    )
}