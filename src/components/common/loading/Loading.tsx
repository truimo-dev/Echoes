import styles from './Loading.module.css'

function Loading() {
    return (
        <div className={styles.loading}>
            <p>
                <span>Loading</span>
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
            </p>
        </div>
    )
}

export {
    Loading
}
