import router from "next/router";
import { setupAPIClient } from "../services/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import Router from "next/router";

const { isAuthenticated, customer } = useContext(AuthContext);
const { cartProducts } = useContext(CartContext);

export function cartFinish(totalCart: number, formatedFrete: number, freteCupom: number, formatedCupom: number, codePromotion: string, cep: string) {
    return async () => {

        const apiClient = setupAPIClient();

        if (totalCart === 0) {
            router.reload();
            return;
        }

        if (cep === "") {
            toast.error("Digite o CEP de destino antes!!!");
            return;
        }

        if (formatedFrete === 0) {
            toast.error("Calcule o frete antes!!!");
            return;
        }

        try {
            const storageId = String(cartProducts[0]?.store_cart_id);
            const existFinish = await apiClient.get(`/findCartTotalFinish?store_cart_id=${storageId}`);
            const { data } = await apiClient.get(`/getCouponCart?code=${codePromotion}`);
            const getCep = await apiClient.get(`/findCepCart?customer_id=${customer?.id}&cep=${cep}`);
            const cepnew = getCep?.data?.cep;

            /*"Valor de desconto (Produto(s) selecionado(s) para essa promoção)", value: "productsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "productsValue") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom,
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep !== cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Valor de desconto em todos os produtos da loja", value: "allProductsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValue") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom,
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep !== cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Valor de desconto no valor total", value: "totalValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "totalValue") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom,
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep !== cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Frete grátis total", value: "freeShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "freeShipping") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: totalCart,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart,
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep !== cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Valor de desconto no valor do frete", value: "valueShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "valueShipping") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: totalCart + freteCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart + freteCupom
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep !== cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Percentual de desconto no valor do frete", value: "shippingPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "shippingPercent") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: totalCart + freteCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart + freteCupom
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep !== cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Percentual de desconto (Produto(s) selecionado(s) para essa promoção)", value: "percentProduct"*/

            if (data?.coupomsconditionals[0]?.conditional === "percentProduct") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep !== cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Percentual de desconto no valor total", value: "totalPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "totalPercent") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep !== cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Percentual de desconto em todos os produtos da loja", value: "allProductsValuePercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValuePercent") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep !== cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            if (existFinish?.data === null) {

                await apiClient.post(`/createCartTotalFinish`, {
                    store_cart_id: storageId,
                    totalCartFinish: totalCart + formatedFrete,
                    customer_id: customer ? customer?.id : null
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else {
                    Router.push('/registerNewDelivey');
                    return;
                }

                return;
            }

            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + formatedFrete
            });

            if (cep === cepnew && isAuthenticated === false) {
                await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                Router.push('/loginClientPayment');
            } else if (cep === cepnew && isAuthenticated === true) {
                await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                Router.push('/payment');
            } else if (cep !== cepnew && isAuthenticated === true) {
                Router.push('/registerNewDelivey');
            } else {
                Router.push('/loginClientPayment');
            }

            return;

        } catch (error) {
            console.log(error);
        }

    }
}