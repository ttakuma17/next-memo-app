import { memo, useCallback, VFC } from 'react';
import { Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { RiLogoutBoxLine, RiHome2Line, RiQuestionLine, RiFileAddLine } from "react-icons/ri";
import { useRouter } from 'next/router';

// イベントの型定義が必要となる
export const Header: VFC = memo(() => {
	const router = useRouter();

	// Link メモ一覧を押したときの処理を記載する関数
	const onClickHome = useCallback(() => router.push('/home'), []);

	// Link 新規メモを押したときの処理を記載する関数
	const onClickNewMemo = useCallback(() => router.push('/new'), []);

	// Link ヘルプを押したときの処理を記載する関数
	const onClickHelp = useCallback(() => router.push('/help'), []);

	// Link ログアウトを押したときの処理を記載する関数
	const onClickLogout = useCallback(() => router.push('/login'), []);

	return (
		<Flex as="nav" bg="cyan.600" color="gray.50" align="center">

			<Heading as="h1" size="md" textAlign="center" pl={4}>おつかいメモ</Heading>

			<Spacer />

			<Flex align="center" mt={2} mb={2}>
				<Button variant='ghost' onClick={onClickNewMemo}>
					<RiFileAddLine size={25} />
				</Button>
				<Button variant='ghost' onClick={onClickHome}>
					<RiHome2Line size={25} />
				</Button>
				<Button variant='ghost' onClick={onClickHelp}>
					<RiQuestionLine size={25} />
				</Button>
				<Button variant='ghost' onClick={onClickLogout}>
					<RiLogoutBoxLine size={25} />
				</Button>
			</Flex>

		</Flex >
	);
});

Header.displayName = 'Header';
