package org.uwcount.config;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.uwcount.dto.AccountAlternative;
import org.uwcount.entity.AccountEntity;
import org.uwcount.entity.AccountTypesEntity;
import org.uwcount.repository.AccountTypesRepository;

import java.util.HashMap;

@RequiredArgsConstructor
@Configuration
public class Config {

    private final AccountTypesRepository repository;

    @Bean
    public ModelMapper getMapper() {
        ModelMapper mapper = new ModelMapper();

        // when mapping AccountEntity → AccountAlternative,
        // use accountEntity.getTypeId().getName() for the DTO's 'type' property
        mapper.typeMap(AccountEntity.class, AccountAlternative.class)
                .addMapping(
                        src -> src.getTypeId().getName(),
                        AccountAlternative::setType
                );

        return mapper;
    }

    @Bean
    CommandLineRunner initAccountTypes() {
        HashMap<Integer, String> accountTypes = new HashMap<Integer, String>();
        accountTypes.put(1, "Cash and Bank");
        accountTypes.put(2, "Other Current Asset");
        accountTypes.put(3, "Non Current Asset");
        accountTypes.put(4, "Credit Card");
        accountTypes.put(5, "Other Current Liability");
        accountTypes.put(6, "Non Current Liability");
        accountTypes.put(7, "Equity");
        accountTypes.put(8, "Revenue");
        accountTypes.put(9, "Other Revenue");
        accountTypes.put(10, "Expense");
        accountTypes.put(11, "Other Expense");
        return args -> {
            for (Integer i : accountTypes.keySet()) {
                AccountTypesEntity entity = new AccountTypesEntity(i, accountTypes.get(i));
                repository.save(entity);
            }
        };
    }
}
