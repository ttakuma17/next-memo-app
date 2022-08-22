import { memo, useCallback, VFC } from 'react';
import { Flex, Heading, Spacer, Text, Button } from '@chakra-ui/react';
import { RiLogoutBoxLine, RiHome2Line, RiQuestionLine, RiFileAddLine } from "react-icons/ri";
import { useRouter } from 'next/router';

// イベントの型定義が必要となる
export const SideHeader: VFC = memo(() => {
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
		// position fixedで固定させることはできるが、要素のレイアウトがうまく調整できていないことが課題
		<Flex as="nav" bg="cyan.600" color="gray.50" flexDirection="column" height="100vh">

			<Heading as="h1" size="md" mt={8}>
				<Text align="center" pr={2} pl={2}>お</Text>
				<Text align="center" pr={2} pl={2}>つ</Text>
				<Text align="center" pr={2} pl={2}>か</Text>
				<Text align="center" pr={2} pl={2}>い</Text>
				<Text align="center" pr={2} pl={2}>メ</Text>
				<Text align="center" pr={2} pl={2}>モ</Text>
			</Heading>

			<Spacer />

			<Flex align="center" flexDirection="column" mb={8}>
				<Button variant='ghost' mb={4} onClick={onClickNewMemo}>
					<RiFileAddLine size={25} />
				</Button>
				<Button variant='ghost' mb={4} onClick={onClickHome}>
					<RiHome2Line size={25} />
				</Button>
				<Button variant='ghost' mb={4} onClick={onClickHelp}>
					<RiQuestionLine size={25} />
				</Button>
				<Button variant='ghost' onClick={onClickLogout}>
					<RiLogoutBoxLine size={25} />
				</Button>
			</Flex>

		</Flex>
	);
});

SideHeader.displayName = 'SideHeader';
