import { memo, useCallback, useEffect, VFC } from 'react';
import { Flex, Wrap, WrapItem, useDisclosure, Spinner, Center, Box } from '@chakra-ui/react';

import { SideHeader } from '../components/SideHeader';
import { MemoItem } from '../components/MemoItem';
import { UpdateMemoModal } from '../components/UpdateMemoModal';
import { useMemoData } from '../hooks/useMemoData';
import { useSelectMemo } from '../hooks/useSelectMemo';

export const Home: VFC = memo(() => {
	const { getAllMemos, memos, loading } = useMemoData();
	const { selectedMemo, onSelectMemo } = useSelectMemo();

	// メモ情報が保存されているHooksがほしい
	// 引数としてmemo情報を渡して上げるときに必要となる
	// Modal用のChakraUI - hooks
	const { isOpen, onOpen, onClose } = useDisclosure();

	// getAllMemos, memos 依存配列に⇦の2つを入れていたから一生ローディングされていた模様
	useEffect(() => getAllMemos(), []);

	// 依存配列にgetAllMemosのみを追加してもDeleteの再レンダリングはされなかった
	// updateボタンによる処理で再レンダリングがされていないのがなぜか
	// console.log(memos);
	// 再レンダリングの仕組みについては復習が必要
	// 依存配列にmemosを追加していなかったので、読み込みされなかった模様
	// 削除のときは再レンダリングされるが、更新のときは再レンダリングされない

	// idの取得はできたが処理として、複雑になりそうなのでカスタムフックへ
	const onClickMemo = useCallback(
		(id: string) => {
			onSelectMemo({ id, memos, onOpen });
			onOpen();
		},
		[memos, onOpen, onSelectMemo]
	);

	// memosが更新されているかどうか memos をuseEffectの依存配列に追加して更新できているか
	// memosが更新されていなさそうなので一覧が更新されないと判断できる

	// Homeページで実装する
	// APIデータの取得中は取得中はローディング処理を実装したい
	// データ取得が完了したら、それぞれのメモアイテムの取得を行う

	// SideHeaderを表示させつつLoadingのSpinnerを画面中央にしたいが、現状はSideHeaderの横の表示されてしまっている
	// y軸にははちょうど中央　明日の残タスクとして修正
	// trueの箇所はloadingが入る

	return (
		<>
			<Flex>
				<SideHeader />
				{loading ? (
					<Center h="100vh" m="auto">
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.400'
							color='cyan.500'
							size='xl'
						/>
					</Center>
				) : (
					<Wrap p={12} justify="center">
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
				)}
			</Flex>
			<UpdateMemoModal
				isOpen={isOpen}
				onClose={onClose}
				selectedMemo={selectedMemo}
			/>
		</>
	);
});

export default Home;
Home.displayName = "Home";
