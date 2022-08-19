import { memo, useCallback, VFC } from 'react';
import { Flex, Heading, Spacer, Link, Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';


// イベントの型定義が必要となる
export const Header: VFC = memo(() => {
	// react router dom の useHistoryを利用してルーティングする
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
		<Flex as="nav" bg="cyan.600" color="gray.50" flexDirection="column" height="100vh">
			<Heading as="h1" size="lg" p={4}>
				<Flex align="center">
					<Text pl={2}>メモアプリ</Text>
				</Flex>
			</Heading>
			<Spacer />
			<Flex align="center" flexDirection="column">
				<Box pr={4}>
					<Link onClick={onClickNewMemo}>新規メモ</Link>
				</Box>
				<Box pr={4}>
					<Link onClick={onClickHome} textAlign="center">
						メモ一覧
					</Link>
				</Box>
				<Box pr={4}>
					<Link onClick={onClickHelp}>ヘルプ</Link>
				</Box>
				<Box pr={4}>
					<Link onClick={onClickLogout}>ログアウト</Link>
				</Box>
			</Flex>
		</Flex>
	);
});

Header.displayName = 'Header';
