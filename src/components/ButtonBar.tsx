import { Button, ButtonGroup } from '@mui/material';
import { ButtonInfo } from '../types';

interface IProps {
	buttonInfo: ButtonInfo
}

const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, func: () => void) => {
	func();
	(e.target as HTMLButtonElement).blur();
	// (e.target as HTMLButtonElement).style.display = 'none';
	document.body.focus();
	(e.target as HTMLButtonElement).blur();
	// console.log(e.target);
	// alert('finished blur')

};

export const ButtonBar = ({ buttonInfo }: IProps) => {
	return (
		<ButtonGroup variant='contained' disableRipple>
			{buttonInfo.buttons.map((dataButton, index) => {
				return (
					<Button
						key={index}
						sx={{
							backgroundColor: `${buttonInfo.color}.main`,
							'&:hover': {
								backgroundColor: `${buttonInfo.color}.dark`,
							},
						}}
						onClick={(e) => handleClick(e, dataButton.func)}
					>{dataButton.title}</Button>
				)
			})}
		</ButtonGroup>
	)
}