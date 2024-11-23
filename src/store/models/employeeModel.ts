/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, Action, computed, Computed, Thunk, thunk } from "easy-peasy";
import { Employee, LoadingStatus, RawEmployee, SortField } from "../../types";
import * as config from "../../config";
import axios from "axios";
import { convertRawEmployeesToEmployees } from "../dataManager";
import { SortDirection } from "@mui/material";

export interface EmployeeModel {
	// state
	employees: Employee[];
	loadingStatus: LoadingStatus;
	searchText: string;
	sortField: SortField;
	sortDirection: SortDirection;

	// computed state
	filteredEmployees: Computed<this, Employee[]>;

	// actions
	_setEmployees: Action<this, Employee[]>;
	_setLoadingStatus: Action<this, LoadingStatus>;
	handleSearchTextChange: Action<this, string>;
	handleChangeSort: Action<this, SortField>;

	// thunk
	loadEmployeesThunk: Thunk<this>;
}

export const employeeModel: EmployeeModel = {
	// state
	employees: [],
	loadingStatus: "readyToLoad",
	searchText: "",
	sortField: "none",
	sortDirection: "asc",

	// computed state
	filteredEmployees: computed((state) => {
		let _filteredEmployees:Employee[] = [];

		//filter
		if (state.searchText.trim() === "") {
			_filteredEmployees = state.employees;
		} else {
			_filteredEmployees = state.employees.filter((m) =>
				m.bulkSearchText
					.toLowerCase()
					.includes(state.searchText.toLowerCase())
			);
		}

		//sort
		return _filteredEmployees;	
	}),

	// actions
	_setEmployees: action((state, employees) => {
		state.employees = employees;
	}),
	_setLoadingStatus: action((state, loadingStatus) => {
		state.loadingStatus = loadingStatus;
	}),
	handleSearchTextChange: action((state, searchText) => {
		state.searchText = searchText;
	}),
	handleChangeSort: action((state, sortField) => {
		if (state.sortField === sortField) {
			state.sortDirection =
				state.sortDirection === "asc" ? "desc" : "asc";
		} else {
			state.sortField = sortField;
			state.sortDirection = "asc";
		}
	}),

	// thunks
	loadEmployeesThunk: thunk(async (actions) => {
		setTimeout(async () => {
			try {
				actions._setLoadingStatus("loading");
				const response = await axios.get(
					`http://localhost:3760/employees`
				);
				actions._setLoadingStatus("finished");
				if (response.status === 200) {
					const rawEmployees = response.data as RawEmployee[];
					const employees =
						convertRawEmployeesToEmployees(rawEmployees);
					actions._setEmployees(employees);
				} else {
					actions._setLoadingStatus("error");
				}
			} catch (e: any) {
				actions._setLoadingStatus("error");
			}
		}, config.uxLoadingSeconds() * 1000);
	}),
};