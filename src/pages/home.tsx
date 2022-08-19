import { memo, useCallback, useEffect, VFC } from 'react';
import { Flex, Wrap, WrapItem, useDisclosure } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MemoItem } from '../components/MemoItem';
import { UpdateMemoModal } from '../components/updateMemoModal';
import { useMemoData } from '../hooks/useMemoData';
import { useSelectMemo } from '../hooks/useSelectMemo';

export const Home = () => {
	const { getAllMemos, memos } = useMemoData();
	const { selectedMemo, onSelectMemo } = useSelectMemo();

	// メモ情報が保存されているHooksがほしい
	// 引数としてmemo情報を渡して上げるときに必要となる
	// Modal用のChakraUI - hooks
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => getAllMemos(), [getAllMemos, memos]);

	// 依存配列にgetAllMemosのみを追加してもDeleteの再レンダリングはされなかった
	// updateボタンによる処理で再レンダリングがされていないのがなぜか
	// console.log(memos);
	// 再レンダリングの仕組みについては復習が必要
	// 依存配列にmemosを追加していなかったので、読み込みされなかった模様
	// 削除のときは再レンダリングされるが、更新のときは再レンダリングされない

	// idの取得はできたが処理として、複雑になりそうなのでカスタムフックへ
	const onClickMemo = useCallback(
		(id: string) => {
			// console.log(id);
			onSelectMemo({ id, memos, onOpen });
			onOpen();
		},
		[memos, onOpen, onSelectMemo]
	);

	// console.log(selectedMemo); // メモ情報は取れていることを確認
	// memosが更新されているかどうか memos をuseEffectの依存配列に追加して更新できているか
	// memosが更新されていなさそうなので一覧が更新されないと判断できる

	// Homeページで実装する
	// APIデータの取得中は取得中はローディング処理を実装したい
	// データ取得が完了したら、それぞれのメモアイテムの取得を行う

	return (
		<>
			<Flex>
				<Header />
				<Wrap p={4} justify="center">
					{memos.map((memo) => (
						<WrapItem key={memo.id} mx="auto">
							<MemoItem
								id={memo.id}
								title={memo.title}
								description={memo.description}
								mark_div={memo.mark_div}
								onClick={onClickMemo}
							/>
						</WrapItem>
					))}
				</Wrap>
				<Footer />
			</Flex>
			<UpdateMemoModal
				isOpen={isOpen}
				onClose={onClose}
				selectedMemo={selectedMemo}
			/>

		</>
	);
}

export default Home;
Home.displayName = "Home";
