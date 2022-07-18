import React, {Component} from 'react'
import HeaderContainer from '../../components/header/headerContainer'
import Product from './components/Product'
import LoadingAnimation from '../../components/loadingAnimation'
import Filter from './components/Filter'
import styles from './stylesheets/dashboard.module.sass'
import Empty from "../../components/common/Empty";


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.products) {
            this.props.getAllProducts()
        }
    }

    render() {
        const renderProducts = () => {
            const {products, error} = this.props

            if (error) {
                return (
                    <Empty
                        msg={error?.message}
                    />
                )
            }

            return (
                <div className={`row ${styles.products}`}>
                    {products && products.map((p, index) =>
                        <div
                            key={p.title + index}
                            className={`col-6 col-sm-4 col-md-4 col-lg-3 my-3 ${styles.product}`}
                            onClick={() => this.props.history.push(`/product-overview/${p._id}`)}>
                            <Product
                                title={p.title}
                                price={`$${p.price} CAD`}
                                color={p.color}
                                image={p.imagePath}
                            />
                        </div>
                    )}
                </div>
            )
        }

        const {applyFilters} = this.props

        return (
            <div className={styles.outbox}>
                {/* Header */}
                <HeaderContainer/>
                <div className={styles.box}>
                    {/* loading animation */}
                    {this.props.loading &&
                    <LoadingAnimation/>
                    }
                    {/* filter */}
                    <div className={styles.filter}>
                        <Filter
                            applyFilters={applyFilters}
                        />
                    </div>
                    {/* products */}
                    {renderProducts()}
                </div>
            </div>
        )
    }
}





