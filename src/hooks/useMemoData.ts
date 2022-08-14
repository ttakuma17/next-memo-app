/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { useRouter } from "next/router";
import axios, { AxiosInstance } from 'axios';
import { useToast } from '@chakra-ui/toast';

type Memo = {
	id: string;
	title: string;
	category: string;
	description: string;
	date: string;
	mark_div: number;
};

// バックエンドのmemoデータを取得する際に利用するカスタムフック
export const useMemoData = () => {
	const [memos, setMemos] = useState<Array<Memo>>([]);
	const router = useRouter();
	const toast = useToast();

	// トークンの情報を何回も記載するのが嫌やな → カスタムフックで分けて、取得したデータを共有する流れにできるよう修正する
	// nullでなければという前提をつける必要がある

	// ベースのリクエスト時にURLは多用するため、インスタンスとして定義
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: 'https://raisetech-memo-api.herokuapp.com/api',
		timeout: 3000,
		headers: { 'Content-Type': 'application/json' },
	});

	// トークンを発行する関数を定義 /login に対するAPIリクエスト[POST]
	const getToken = useCallback((email, password): void => {
		axiosInstance
			.post('/login', {
				email: email,
				password: password,
			})
			.then((response) => {
				console.log(response);
				// 実装が必要な処理「取得したトークン情報をローカルストレージへ保存する」
				// 取得した情報をJSON形式へ変換し、変数へ格納する
				const token = JSON.stringify(response.data);
				localStorage.setItem('token', token);
				toast({
					title: 'ログインに成功しました',
					status: 'success',
					isClosable: true,
				});
				router.push('/home');
			})
			.catch((error) => {
				// 情報が一致しない場合にcatchへ処理が遷移していることを確認
				console.log(error);
				toast({
					title: 'ログインに失敗しました',
					status: 'error',
					isClosable: true,
				});
				// ログインページへルーティング
			});
	}, []);

	// メモの一覧を取得するために利用する関数
	const getAllMemos = useCallback((): void => {
		// nullの型制御のテストコード
		const tokenInLocalStorage: string | null = localStorage.getItem('token');
		// tokenInLocalStorage の型推論から string | null の可能性があると言われている
		// 型ガードで対応する
		if (tokenInLocalStorage === null) {
			console.error('ローカルストレージへ保存できていません');
		} else {
			// 以下の処理へ移行した時点でローカルストレージがNullである可能性は排除できる = 安全なコード
			const token = JSON.parse(tokenInLocalStorage);
			console.log(typeof token.access_token);
			axiosInstance
				.get<Array<Memo>>('/memos', {
					headers: {
						Authorization: `Bearer ${token.access_token}`,
					},
				})
				.then((response) => {
					setMemos(response.data);
				})
				.catch((error) => {
					console.log(error);
					toast({
						title: 'メモデータの取得に失敗しました',
						status: 'error',
						isClosable: true,
					});
					router.push('/');
				});
		}
	}, []);

	// メモの新規登録を行う関数
	const createNewMemo = useCallback((title, description, value): void => {
		const tokenInLocalStorage: any = localStorage.getItem('token');
		const token: any = JSON.parse(tokenInLocalStorage);
		axiosInstance
			.post(
				'/memo',
				{
					title: title,
					category: 'カテゴリ',
					description: description,
					date: '2021/08/01',
					mark_div: value,
				},
				{
					headers: {
						Authorization: `Bearer ${token.access_token}`,
					},
				}
			)
			.then((response) => {
				console.log(response); // 変更を加えたデータのみがレスポンスとして返ってくる
				toast({
					title: 'メモの登録が完了しました',
					status: 'success',
					isClosable: true,
				});
				router.push('/home');
			})
			.catch((error) => {
				console.log(error);
				toast({
					title: 'メモの登録に失敗しました。もう一度入力してください',
					status: 'error',
					isClosable: true,
				});
				router.push('/new');
			});
	}, []);

	// メモの更新を行うために利用する関数
	const updateMemo = useCallback((id, title, description): void => {
		const tokenInLocalStorage: any = localStorage.getItem('token');
		const token: any = JSON.parse(tokenInLocalStorage);
		// const id = '310';
		axiosInstance
			.put(
				`/memo/${id}`,
				{
					title: title,
					category: '更新授業メモ',
					description: description,
					date: '2021/08/01',
					mark_div: 0,
				},
				{
					headers: {
						Authorization: `Bearer ${token.access_token}`,
					},
				}
			)
			.then((response) => {
				// レスポンスとして期待するデータ
				console.log(response); // 変更を加えたデータのみがレスポンスとして返ってくる
				toast({
					title: 'メモデータを更新しました',
					status: 'success',
					isClosable: true,
				});
			})
			.catch((error) => {
				// エラー時のロジックはほぼ共通化できるため、後ほど実装
				console.log(error);
				toast({
					title: 'メモデータの更新に失敗しました',
					status: 'error',
					isClosable: true,
				});
			});
	}, []);

	// メモを削除するときに利用する関数
	const deleteMemo = useCallback((id): void => {
		const tokenInLocalStorage: any = localStorage.getItem('token');
		const token: any = JSON.parse(tokenInLocalStorage);
		// const id = '332';
		axiosInstance
			.delete(`/memo/${id}`, {
				headers: {
					Authorization: `Bearer ${token.access_token}`,
				},
			})
			.then((response) => {
				// レスポンスとして期待するデータ
				console.log(response);
				toast({
					title: 'メモの削除が完了しました',
					status: 'success',
					isClosable: true,
				});
			})
			.catch((error) => {
				// エラー時のロジックはほぼ共通化できるため、後ほど実装
				console.log(error);
				toast({
					title: 'メモの削除に失敗しました',
					status: 'error',
					isClosable: true,
				});
			});
	}, []);

	return {
		getToken,
		getAllMemos,
		memos,
		createNewMemo,
		updateMemo,
		deleteMemo,
	};
};
