import Widgets from "./Widgets";
import React, {useEffect, useState} from "react";
import ExpenseService from "../../api/ExpenseService";
import ProductService from "../../api/ProductService";
import OrderService from "../../api/OrderService";
import CongeService from "../../api/CongeService";
import ReservationService from "../../api/ReservationService";
import {Spinner} from "react-bootstrap";
import Loading from "../Loading";

const DashboardCollaborateur = (props) => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [expense, setExpense] = useState(null);
    const [conge, setConge] = useState(null);
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        const userData  = localStorage.getItem("authUser")?JSON.parse(localStorage.getItem("authUser")):null

        setLoading(true)
        ExpenseService.getExpenseSum(userData.data.id).then(reponse=>{
            if (reponse.status===200){
                setExpense(
                        { title: "Demande Note de frais", iconClass: "cash-check", total: (reponse.data.sum?reponse.data.sum:0)+" DT", average: "+89%", badgecolor: "info" }
                    )
            }
        })
        CongeService.getCongeStat(userData.data.id).then(reponse=>{
            if (reponse.status===200){
                setConge({ title: "Demande de Conge", iconClass: "calendar", total: (reponse.data.sum?reponse.data.sum:0), average: "0%", badgecolor: "warning" })
            }
        })
        OrderService.getOrdersstat(userData.data.id).then(reponse=>{
            if (reponse.status===200){
                setProduct(
                    { title: "Demande de Matriel", iconClass: "basket", total: (reponse.data.nbr?reponse.data.nbr:0), average: "-29%", badgecolor: "danger" },
                )
            }
        })
        ReservationService.getReservationStat(userData.data.id).then(reponse=>{
            if (reponse.status===200){
                setReservation(
                    { title: "Reservation Salle", iconClass: "table-chair", total: (reponse.data.nbr?reponse.data.nbr:0), average: "0%", badgecolor: "warning" },
                )
                setLoading(false)

            }
        })


    }, [])
        return (
            <div >
                {loading || !product || !expense || !conge || !reservation ?
                    <Loading/>
                    :<Widgets reports={[expense,product,conge,reservation]} />}
            </div>
        )

}

export default DashboardCollaborateur;
