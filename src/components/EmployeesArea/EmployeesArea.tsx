import { useTypedStoreActions, useTypedStoreState } from "../../store/easy-peasy-hooks";
import { Example } from "../Example"
import { WaitSpinner } from "../WaitSpinner";
import './styles.scss'

export const EmployeesArea = () => {
	const { filteredEmployees, loadingStatus, sortField, sortDirection } = useTypedStoreState((state) => state.employeeModel);
	const { handleSearchTextChange, handleChangeSort } = useTypedStoreActions((actions) => actions.employeeModel);

	return (
		<section className="pageEasyPeasy">
			<Example title="employee objects via API with full CRUD functionality">
				<form className="my-2 flex gap-3">
					<input placeholder="search" onChange={(e) => handleSearchTextChange(e.target.value)} className="bg-gray-300 rounded p-1 text-lg" />
					({sortField}/{sortDirection})
				</form>
				{(loadingStatus === "readyToLoad" || loadingStatus === "loading") && (
					<WaitSpinner />
				)}
				{loadingStatus === "error" && (
					<p className="text-red-800 italic">Sorry, the data couldn't be loaded, please contact the website administrator.</p>
				)}
				<table className={`employees ${loadingStatus === 'finished' ? 'fadeIn' : 'fadeOut'}`}>
					{loadingStatus === "finished" && (
						<>
							<thead>
								<tr>
									<th className="dpId">dpodid</th>
									<th  onClick={() => handleChangeSort("firstName")}><span>First Name</span></th>
									<th className="cursor-pointer select-none" onClick={() => handleChangeSort("lastName")}>Last Name</th>
									<th className="cursor-pointer select-none" onClick={() => handleChangeSort("dateOfBirth")}>Date of Birth</th>
									<th className="cursor-pointer select-none" onClick={() => handleChangeSort("department")}>Department</th>
									<th className="cursor-pointer select-none" onClick={() => handleChangeSort("isActive")}>Is Active</th>
									<th className="cursor-pointer select-none" onClick={() => handleChangeSort("yearsOfExperience")}>Years Experience</th>
								</tr>
							</thead>
							<tbody>
								{filteredEmployees.map(employee => {
									return (
										<tr key={employee.id}>
											<td className="dpId">{employee.dpodId}</td>
											<td className="dpLine">{employee.firstName}</td>
											<td className="dpLine">{employee.lastName}</td>
											<td className="dpDate">{employee.dateOfBirth}</td>
											<td className="dpLine">{employee.department}</td>
											<td className="dpYesNo">{employee.isActive ? 'yes' : 'no'}</td>
											<td className="dpWholeNumber">{employee.yearsOfExperience}</td>
										</tr>
									)
								})}
							</tbody>
						</>
					)}
				</table>
			</Example>
		</section>
	)
}