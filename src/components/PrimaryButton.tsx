import { Button } from '@chakra-ui/button';
import { memo, ReactNode, VFC } from 'react';

type Props = {
	children: ReactNode;
	onClick: (id: any) => void;
	disabled?: boolean;
	loading?: boolean;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
	const { children, onClick } = props;
	return (
		<Button
			m={2}
			bg="cyan.500"
			color="white"
			_hover={{ opacity: 0.8 }}
			onClick={onClick}>
			{children}
		</Button>
	);
});

PrimaryButton.displayName = 'PrimaryButton';
