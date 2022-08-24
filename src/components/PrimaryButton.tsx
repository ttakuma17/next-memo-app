import { Button } from '@chakra-ui/button';
import { memo, ReactNode, VFC } from 'react';

type Props = {
	children: ReactNode;
	onClick: (id: any) => void;
	disabled?: boolean;
	loading?: boolean;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
	const { children, onClick, disabled } = props;
	return (
		<Button
			my={2}
			mx={4}
			bg="cyan.500"
			color="white"
			_hover={{ opacity: 0.8 }}
			disabled={disabled}
			onClick={onClick}>
			{children}
		</Button>
	);
});

PrimaryButton.displayName = 'PrimaryButton';
