import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
	// возравращает функцию, которая возвращает компонент
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = {
				error: null,
			};
			this.requestInterceptor = axios.interceptors.request.use(request => {
				// при отправке запроса очищаем ошибки
				this.setState({error: null});
				return request;
			});
			this.responseInterceptor = axios.interceptors.response.use(response => {
				return response;
			}, error => {
				this.setState({error: error});
				return Promise.reject(error);
			});
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.requestInterceptor);
			axios.interceptors.response.eject(this.responseInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({error: null});
		}

		render() {
			return (
					<Aux>
						<Modal
								show={this.state.error}
								modalClosed={this.errorConfirmedHandler}>
							{
								// убираем сообщение об ошибке в модалке, так как
									// модалка существует, даже, если не видна
								this.state.error ? this.state.error.message : null}
						</Modal>
						<WrappedComponent {...this.props} />
					</Aux>
			);
		}
	}
}

export default withErrorHandler;