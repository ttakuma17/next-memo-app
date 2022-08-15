import {
	Heading,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from '@chakra-ui/react';
import { Box, Center, Text } from '@chakra-ui/layout';
import React, { memo, VFC } from 'react';
import { Header } from '../components/Header';

export const Help: VFC = memo(() => {
	return (
		<>
			<Header />
			<Heading as="h1" size="md" pt={4} textAlign="center">
				ヘルプページ
			</Heading>

			<Center>
				<Box pt={4}>
					<Box>
						<Text textAlign="center">使い方紹介</Text>
					</Box>
					<Tabs bg="white">
						<TabList>
							<Tab>メモ一覧ページ</Tab>
							<Tab>ヘルプページ</Tab>
							<Tab>404ページ</Tab>
							<Tab>ログインページ</Tab>
						</TabList>
						<TabPanels pl={4}>
							<TabPanel>
								<p>メモ一覧</p>
							</TabPanel>
							<TabPanel>
								<p>ヘルプページ</p>
							</TabPanel>
							<TabPanel>
								<p>404ページ</p>
							</TabPanel>
							<TabPanel>
								<p>ログインページ</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Center>

			<Center>
				<Box pt={4}>
					<Box>
						<Text textAlign="center">追加/修正予定の内容</Text>
					</Box>
					<Tabs bg="white">
						<TabList>
							<Tab>メモ一覧ページ</Tab>
							<Tab>ヘルプページ</Tab>
							<Tab>404ページ</Tab>
							<Tab>ログインページ</Tab>
						</TabList>
						<TabPanels pl={4}>
							<TabPanel>
								<p>メモ一覧</p>
								<ol>
									<li>Checkboxを編集可能に変更</li>
									<li>Checkboxに応じて表示/非表示(グレーアウトさせる)</li>
									<li>データのローディング中の処理を記載</li>
									<li>
										メモの説明の箇所がreadonlyなのにフォーカスが有効になっているので、無効に変更
									</li>
									<li>アイコンの大きさを文字と合わせる</li>
									<li>メモの追加日時がわかる機能を追加</li>
									<li>メモに任意のカテゴリーを追加できるように機能追加</li>
								</ol>
							</TabPanel>
							<TabPanel>
								<p>ヘルプページ</p>
								<ol>
									<li>機能修正が終わり次第、メモアプリの説明を追加する</li>
									<li>
										参考とするヘルプページを決めて、レイアウトなどを整える
									</li>
								</ol>
							</TabPanel>
							<TabPanel>
								<p>404ページ</p>
								<ol>
									<li>
										ログイン案内→任意の秒数が立つと自動でログインページへ遷移するよう機能を変更
									</li>
								</ol>
							</TabPanel>
							<TabPanel>
								<p>ログインページ</p>
								<ol>
									<li>
										値を入力していない場合にはログインボタンdisabledに変更する
									</li>
									<li>
										メールアドレス/パスワードの入力値が誤っている場合には、そのことがわかるメッセージを表示させる
									</li>
								</ol>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Center>
		</>
	);
});

Help.displayName = 'Help';
export default Help;
