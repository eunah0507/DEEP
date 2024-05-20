package com.basic.deep.member.repository;

import com.basic.deep.member.entity.Alert;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static com.basic.deep.member.entity.QAlert.alert;

public class AlertRepositoryImpl implements AlertRepositoryCustom {

    @Autowired
    private JPAQueryFactory queryFactory;

    @Override
    public Optional<Alert> selectMemberIDAndDelete(String memberID) {
        Optional<Alert> firstSelectNextDelete = Optional.ofNullable(queryFactory.select(alert)
                .from(alert)
                .where(alert.memberID.eq(memberID))
                .fetchFirst());

        // 최적화된 코드는 아래 3줄과 같다. 근데 이해 못해서 그냥 이렇게 씀
        //  firstSelectNextDelete.ifPresent(value -> queryFactory.delete(alert)
        //                .where(alert.alertNo.eq(value.getAlertNo()))
        //                .execute());

        if (!firstSelectNextDelete.isEmpty()) {
            queryFactory.delete(alert)
                    .where(alert.alertNo.eq(firstSelectNextDelete.get().getAlertNo()))
                    .execute();
        }


        return firstSelectNextDelete;
    }
}
