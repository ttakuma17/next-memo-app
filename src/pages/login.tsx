import { ChangeEvent, memo, useState, VFC } from 'react';

import { Input } from '@chakra-ui/input';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/react';

import { PrimaryButton } from '../components/PrimaryButton';

import { useMemoData } from '../hooks/useMemoData';

export const Login = () => {
	const [email, setEmail] = useState("");
	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

	const [password, setPassword] = useState("");
	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

	const { getToken } = useMemoData();

	return (
		<Flex align="center" justify="center" h="100vh">
			<Center>
				<Box p={8} m={4} bg="white" borderRadius="2xl">
					<Heading as="h1" size="md" textAlign="center">
						何でもメモアプリ
					</Heading>
					<Flex>
						<Box textAlign="center">
							<Input
								mt="4"
								placeholder="メールアドレス"
								onChange={onChangeEmail}
								value={email}
							/>
							<Input
								mt="4"
								mb="2"
								placeholder="パスワード"
								onChange={onChangePassword}
								value={password}
							/>
							<PrimaryButton
								onClick={() => {
									getToken(email, password);
								}}
							>ログイン</PrimaryButton>
						</Box>
					</Flex>
				</Box>
			</Center>
		</Flex>
	);
}

export default Login;
