import React, { ChangeEvent, memo, useState, VFC } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Divider, Flex, Heading, Stack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { Textarea } from '@chakra-ui/textarea';
import { PrimaryButton } from './PrimaryButton';
import { useMemoData } from '../hooks/useMemoData';
import { useRouter } from 'next/router';

export const RegisterMemo: VFC = memo(() => {
	// 実装する機能の整理
	// onChangeイベントの定義
	const [title, setTitle] = useState('');
	const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);
	// inputされたパスワードをステート管理 password
	const [description, setDescription] = useState('');
	const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setDescription(e.target.value);
	// ラジオボタンの番号の整理
	// valueは数値型で送信する必要がある Badrequestの修正ができれば完成しそう
	// 現状はstring型になってしまっていることに注意
	const [value, setValue] = useState('1');
	// ボタンを押したときの処理:カスタムフックの呼び出し
	// onClickを押したときに、バックエンド側に新しいMemoを追加する関数を実行
	const { createNewMemo } = useMemoData();
	// homeのルート
	const route = useRouter();

	return (
		<Flex align="center" justify="center" height="100vh">
			<Box w="500px" p={8} m={4} bg="white" borderRadius="2xl">
				<Heading as="h1">新規メモの登録</Heading>
				<Divider pt={2} mb={4} />
				<Stack>
					<FormControl>
						<FormLabel>タイトル</FormLabel>
						<Input
							placeholder="新しいメモのタイトルを入力"
							onChange={onChangeTitle}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>詳細</FormLabel>
						<Textarea
							placeholder="新しいメモの詳細を入力"
							resize="none"
							h="180px"
							onChange={onChangeDescription}
						/>
					</FormControl>
				</Stack>
				<Flex alignItems="center">
					<RadioGroup onChange={setValue} value={value}>
						<Stack direction="row">
							<Radio value="1">表示</Radio>
							<Radio value="0">非表示</Radio>
						</Stack>
					</RadioGroup>
					<PrimaryButton
						onClick={() => {
							// radioボタンのvalueを文字列→数値へ変換して変数格納する必要がありそう
							// 方法は要検討
							// JSのコードとして以下の関数の実行前に入れ替えるのか、state側で制御するとか？
							const mark_div = parseInt(value);
							createNewMemo(title, description, mark_div);
						}}>
						登録
					</PrimaryButton>
					<PrimaryButton
						onClick={() => {
							route.push('/home');
						}}>
						一覧へ戻る
					</PrimaryButton>
				</Flex>
			</Box>
		</Flex>
	);
});

RegisterMemo.displayName = 'RegisterMemo';
