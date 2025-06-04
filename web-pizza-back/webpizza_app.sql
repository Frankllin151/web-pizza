-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 04, 2025 at 07:43 PM
-- Server version: 8.0.42
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webpizza_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `dados_users`
--

CREATE TABLE `dados_users` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `cpf` varchar(20) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `rua_avenida` varchar(255) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `nome_cartao` varchar(200) DEFAULT NULL,
  `numero_cartao` varchar(30) DEFAULT NULL,
  `validade_cartao` varchar(10) DEFAULT NULL,
  `cvv` varchar(10) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dados_users`
--

INSERT INTO `dados_users` (`id`, `user_id`, `cpf`, `telefone`, `rua_avenida`, `numero`, `complemento`, `bairro`, `cidade`, `nome_cartao`, `numero_cartao`, `validade_cartao`, `cvv`, `created_at`, `updated_at`) VALUES
(9, 9, '151.562.074-30', '84986044130', 'Rua Maria Luiza De Araujo', '04', 'Padaria Dona greuza', 'Centro', 'Barcelona', NULL, NULL, NULL, NULL, '2025-05-29 17:55:35', '2025-05-29 17:55:35'),
(10, 10, '151.522.174-33', '84906054120', 'Rua campo azul', '1320', 'Padaria Dona greuza', 'Centro', 'Parnamirim', NULL, NULL, NULL, NULL, '2025-05-29 17:56:39', '2025-05-29 17:56:39');

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int NOT NULL,
  `cliente` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL,
  `id_pagamento` varchar(200) DEFAULT NULL,
  `metodo_pagamento` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pedido_itens`
--

CREATE TABLE `pedido_itens` (
  `id` int NOT NULL,
  `pedido_id` int NOT NULL,
  `pizza_id` int NOT NULL,
  `quantidade` int NOT NULL DEFAULT '1',
  `tamanho` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `descricao` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pizzas`
--

INSERT INTO `pizzas` (`id`, `nome`, `imagem`, `descricao`) VALUES
(1, 'Pizza Margherita', '/pizza/pizza.png', 'Molho de tomate, mussarela, manjericão fresco e azeite de oliva'),
(2, 'Pizza Portuguesa', '/pizza/pizza.png', 'Molho de tomate, presunto, ovos, cebola, azeitonas, ervilha e queijo mussarela'),
(3, 'Pizza Calabresa', '/pizza/pizza.png', 'Molho de tomate, linguiça calabresa, cebola e queijo mussarela'),
(4, 'Pizza Quatro Queijos', '/pizza/pizza.png', 'Molho de tomate, mussarela, provolone, gorgonzola e parmesão'),
(5, 'Pizza Frango com Catupiry', '/pizza/pizza.png', 'Molho de tomate, frango desfiado, catupiry e queijo mussarela'),
(6, 'Pizza Vegetariana', '/pizza/pizza.png', 'Molho de tomate, abobrinha, berinjela, pimentão e queijo mussarela'),
(7, 'Pizza Pepperoni', '/pizza/pizza.png', 'Molho de tomate, pepperoni e queijo mussarela'),
(8, 'Pizza Napolitana', '/pizza/pizza.png', 'Molho de tomate, mussarela, parmesão e orégano'),
(9, 'Pizza Mexicana', '/pizza/pizza.png', 'Molho de tomate, carne moída, pimenta jalapeño e queijo cheddar'),
(10, 'Pizza Bacon', '/pizza/pizza.png', 'Molho de tomate, bacon crocante e queijo mussarela');

-- --------------------------------------------------------

--
-- Table structure for table `pizza_precos`
--

CREATE TABLE `pizza_precos` (
  `id` int NOT NULL,
  `pizza_id` int DEFAULT NULL,
  `tamanho` enum('p','m','g','gg') DEFAULT NULL,
  `preco` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pizza_precos`
--

INSERT INTO `pizza_precos` (`id`, `pizza_id`, `tamanho`, `preco`) VALUES
(15, 1, 'p', 1.00),
(16, 1, 'm', 35.90),
(17, 1, 'g', 45.90),
(18, 1, 'gg', 55.90),
(19, 2, 'p', 1.00),
(20, 2, 'm', 40.90),
(21, 2, 'g', 52.90),
(22, 2, 'gg', 62.90),
(23, 3, 'p', 28.90),
(24, 3, 'm', 38.90),
(25, 3, 'g', 47.90),
(26, 3, 'gg', 57.90),
(27, 4, 'p', 32.90),
(28, 4, 'm', 42.90),
(29, 4, 'g', 54.90),
(30, 4, 'gg', 64.90),
(31, 5, 'p', 29.90),
(32, 5, 'm', 39.90),
(33, 5, 'g', 49.90),
(34, 5, 'gg', 59.90),
(35, 6, 'p', 26.90),
(36, 6, 'm', 36.90),
(37, 6, 'g', 46.90),
(38, 6, 'gg', 56.90),
(39, 7, 'p', 30.90),
(40, 7, 'm', 40.90),
(41, 7, 'g', 50.90),
(42, 7, 'gg', 60.90),
(43, 8, 'p', 28.90),
(44, 8, 'm', 38.90),
(45, 8, 'g', 48.90),
(46, 8, 'gg', 58.90),
(47, 9, 'p', 35.90),
(48, 9, 'm', 45.90),
(49, 9, 'g', 55.90),
(50, 9, 'gg', 65.90),
(51, 10, 'p', 33.90),
(52, 10, 'm', 43.90),
(53, 10, 'g', 53.90),
(54, 10, 'gg', 63.90);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `nome` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `tipo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `token` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nome`, `email`, `senha`, `tipo`, `token`, `created_at`, `updated_at`) VALUES
(1, 'Teste', 'teste30@gmail.com', '$2y$12$cu4F7sUA0QNKTQcVcodAG.O.Tgo6g4EUmaH10gvrDnxJSoejHyrgu', 'admin', 'dba74fe5fac0d82d75637d1c8520622d', '2025-04-30 18:45:05', '2025-04-30 18:45:05'),
(9, 'FERNANDO LOPES DE SOUZA', 'frankllinsilva300@gmail.com', '$2y$12$Ym2/9jIhxlhpVoKtUR6J/u.0hPS1EINWPtUCVkFp.1owfiVCzfAvS', NULL, NULL, '2025-05-29 17:55:35', '2025-05-29 17:55:35'),
(10, 'GameTeste', 'game@gmail.com', '$2y$12$01aL4OQ4Q6CZlfVQLKveK.mpu2VtxEccd8JXiBEffjQW0yMt2kcqG', NULL, NULL, '2025-05-29 17:56:39', '2025-05-29 17:56:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dados_users`
--
ALTER TABLE `dados_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pedido_itens`
--
ALTER TABLE `pedido_itens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `pizza_id` (`pizza_id`);

--
-- Indexes for table `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pizza_precos`
--
ALTER TABLE `pizza_precos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pizza_id` (`pizza_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dados_users`
--
ALTER TABLE `dados_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `pedido_itens`
--
ALTER TABLE `pedido_itens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pizza_precos`
--
ALTER TABLE `pizza_precos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dados_users`
--
ALTER TABLE `dados_users`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `pedido_itens`
--
ALTER TABLE `pedido_itens`
  ADD CONSTRAINT `pedido_itens_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `pedido_itens_ibfk_2` FOREIGN KEY (`pizza_id`) REFERENCES `pizzas` (`id`);

--
-- Constraints for table `pizza_precos`
--
ALTER TABLE `pizza_precos`
  ADD CONSTRAINT `pizza_precos_ibfk_1` FOREIGN KEY (`pizza_id`) REFERENCES `pizzas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
