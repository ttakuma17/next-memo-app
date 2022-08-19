import { ChangeEvent, memo, useState, VFC } from 'react';

import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button, Center } from '@chakra-ui/react';

import { PrimaryButton } from '../components/PrimaryButton';
import { useMemoData } from '../hooks/useMemoData';

export const Login = () => {
	const [email, setEmail] = useState("");
	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

	const [show, setShow] = useState<boolean>(false);
	const handleClick = () => setShow(!show);

	const [password, setPassword] = useState("");
	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

	const { getToken } = useMemoData();

	return (
		<Flex align="center" justify="center" h="100vh">
			<Center>
				<Box p={8} m={4} bg="white" borderRadius="2xl">
					<Heading as="h3" size="lg" textAlign="center">
						おつかいメモアプリ
					</Heading>
					<Flex>
						<Box textAlign="center">
							<Input
								mt="4"
								size="lg"
								placeholder="email"
								onChange={onChangeEmail}
								value={email}
							/>
							<InputGroup size="lg" mt={4} mb={2}>
								<Input
									placeholder="password"
									onChange={onChangePassword}
									value={password}
									type={show ? "text" : "password"}
								/>
								<InputRightElement width="4.5rem">
									<Button onClick={handleClick} size="sm">
										{show ? "Hide" : "Show"}
									</Button>
								</InputRightElement>
							</InputGroup>
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
