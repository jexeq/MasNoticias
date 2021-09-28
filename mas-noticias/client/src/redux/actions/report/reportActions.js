import axios from 'axios';
import * as TYPES from "../../actionTypes";

export const getReportById = (reportId) => {
    return async  (dispatch) => {
        const res = await axios.get('/report/' + reportId)
        return dispatch({ type: TYPES.GET_REPORT_BY_ID, payload: res.data })
    }
}

export const getweekReports = () => {
    return async (dispatch) => {
        const res = await axios.get("/report/week_reports")
        return dispatch({type: TYPES.GET_WEEK_REPORTS, payload: res.data})
    }
}

export const getReportSection = (sectionId) => {
    return async (dispatch) => {
        const res = await axios.get(`/report/section/${sectionId}`)
        return dispatch({type: TYPES.GET_REPORTS_BY_SECTION, payload: res.data})
    }
}

export const getReportTag = (tagId) => {
    return async (dispatch) => {
        const res = await axios.get(`/report/tag/${tagId}`)
        return dispatch({type: TYPES.GET_REPORTS_BY_TAG, payload: res.data})
    }
}

export const updateReport = (body) => {
    return async (dispatch) => {
        const res = await axios.put(`/report/${body.report.id}` , body)
        return dispatch({type: TYPES.UPDATE_REPORT, payload: res.data})
    }
}

export const updateReportStatus = (reportId, newStatus) => {
    return async (dispatch) => {
        const res = await axios.put(`/report/update-status/${reportId}`, {newStatus: newStatus});
        return dispatch({type: TYPES.UPDATE_REPORT_STATUS, payload: res.data})
    }
}

export const updateReportPriority = (reportId, newPriority) => {
    return async (dispatch) => {
        const res = await axios.put(`/report/update-priority/${reportId}`, {newPriority: newPriority});
        return dispatch({type: TYPES.UPDATE_REPORT_PRIORITY, payload: res.data})
    }
}
export const createReport = (body) => {
    return async (dispatch) => {
        const res = await axios.post("/report/" , body) 
        return dispatch({type: TYPES.CREATE_REPORT, payload: res.data})
    }
}

export const deleteReport = (reportId) => {
    return async (dispatch) => {
        const res = await axios.delete("/report/" + reportId)
        return dispatch({type: TYPES.DELETE_REPORT, payload: res.data})
    }
}