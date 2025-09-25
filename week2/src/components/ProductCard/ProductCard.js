import styles from './ProductCard.module.css'

function ProductCard({title="not given",price=100,inStock=false,specialOffer=false}) {
    
    return(
        <>
            <div className={styles.card}>
                <h2 className={styles.title}> {title}</h2>
                <span className={styles.price}> RS {price}</span>
                <span className={`${styles.badge} ${inStock? styles.inStock : styles.outOfStock}`}> {inStock? <p>In Stock</p>:  <p>Out of Stock</p> }</span>
                <span style={{    display: "inline-block",   // needed if you want transform to work properly
                    transform: "translateY(-4px)",
                    transition: "transform 0.2s ease", // smooth animation when it changes
                    cursor: "pointer",         // show pointer on hover
                    color: "gold",             // change text color
                    fontSize: "20px",          // resize the star
                    marginLeft: "8px"          // adjust spacing
                    }}> {specialOffer && "🌟"}</span>
            </div>
        </>
    );
}
export default ProductCard;